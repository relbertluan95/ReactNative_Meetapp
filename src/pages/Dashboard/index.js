import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
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

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadPage(pageNumber = 1) {
    const nowDate = format(date, 'yyyy-MM-dd');
    const response = await api.get('meetapp', {
      params: { date: nowDate, page: pageNumber },
    });

    setMeetapp(response.data);
    // setPage(pageNumber + 1);
    console.tron.log(meetapp);
  }

  useEffect(() => {
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
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
          // onEndReached={() => loadPage()}
          // onEndReachedThreshold={0.1}
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
