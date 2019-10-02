import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Background from '~/components/Background';
import Meetapp from '~/components/Meetapp';
import Header from '~/components/Header';

import { Container, List, ControlDate, Date } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new window.Date());
  const [meetapp, setMeetapp] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadPage(pageNumber = page) {
    const nowDate = format(date, 'yyyy-MM-dd');
    const response = await api.get('meetapp', {
      params: { date: nowDate, page: pageNumber },
    });

    const { data } = response;

    setMeetapp([...meetapp, ...data]);
    // setPage(pageNumber + 1);
  }

  function onRefresh() {
    setRefreshing(true);

    setPage(1);
    setMeetapp([]);

    loadPage();

    setRefreshing(false);
  }

  async function loadNextPage() {
    const meetappLength = meetapp.length;

    if (meetappLength < 10) return;

    setPage(page + 1);
  }

  useEffect(() => {
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, page]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
    setMeetapp([]);
    setPage(1);
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
    setMeetapp([]);
    setPage(1);
  }

  return (
    <Background>
      <Container>
        <Header />

        <ControlDate>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="keyboard-arrow-left" size={30} color="#fff" />
          </TouchableOpacity>
          <Date>{dateFormatted}</Date>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="keyboard-arrow-right" size={30} color="#fff" />
          </TouchableOpacity>
        </ControlDate>

        <List
          data={meetapp}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetapp data={item} />}
          onEndReached={() => loadNextPage()}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetapp',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};
