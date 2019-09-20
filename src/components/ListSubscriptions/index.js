import React, { useMemo, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Button from '~/components/Button';
import {
  Container,
  Image,
  Content,
  Title,
  InfoContent,
  InfoContentText,
} from './styles';

export default function ListSubscriptions({ data }) {
  const dateParsed = useMemo(() => {
    return format(parseISO(data.meetapp.date), "d 'de' MMMM', às' HH:mm'h'", {
      locale: pt,
    });
  }, [data.meetapp.date]);

  async function handleCanceledSubscription(id) {
    try {
      await api.delete(`subscription/${id}`);
      Alert.alert(
        'Cancelamento de meetapp',
        `Você cencelou sua inscrição para o meetapp, ${data.title}.`
      );
    } catch (err) {
      Alert.alert('Erro ao cancelar');
      console.tron.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <Image source={{ uri: data.meetapp.banner.url }} />
      <Content>
        <Title>{data.meetapp.title}</Title>
        <InfoContent>
          <Icon name="event" size={20} color="#999" />
          <InfoContentText>{dateParsed}</InfoContentText>
        </InfoContent>
        <InfoContent>
          <Icon name="map" size={20} color="#999" />
          <InfoContentText numberOfLines={2}>
            {data.meetapp.location}
          </InfoContentText>
        </InfoContent>
        <InfoContent last>
          <Icon name="person" size={20} color="#999" />
          <InfoContentText>
            Organizador: {data.meetapp.organizer.name}
          </InfoContentText>
        </InfoContent>
        <Button onPress={() => handleCanceledSubscription(data.id)}>
          Cancelar Inscrição
        </Button>
      </Content>
    </Container>
  );
}
