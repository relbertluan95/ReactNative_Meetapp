import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Background from '~/components/Background';
import ListSubscriptions from '~/components/ListSubscriptions';
import Header from '~/components/Header';

import { Container, Title, List } from './styles';

export default function Subscription() {
  const [meetapp, setMeetapp] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMeetapp();
  }, []);

  async function loadMeetapp() {
    try {
      const response = await api.get('subscriptions');

      setMeetapp(response.data);
      console.tron.log(response.data);
    } catch (err) {
      console.tron.error(err.response.data);
    }
  }

  function onRefresh() {
    setRefreshing(true);

    setMeetapp([]);

    loadMeetapp();

    setRefreshing(false);
  }

  return (
    <Background>
      <Container>
        <Header />

        <List
          data={meetapp}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <ListSubscriptions data={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="assignment" size={20} color={tintColor} />
  ),
};
