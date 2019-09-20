import React, { useMemo } from 'react';
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

export default function Meetapp({ data }) {
  const dateParsed = useMemo(() => {
    return format(parseISO(data.date), "d 'de' MMMM', às' HH:mm'h'", {
      locale: pt,
    });
  }, [data.date]);

  async function handleSubscription(id) {
    try {
      await api.post(`meetapp/${id}/subscription`);
      Alert.alert(
        'Inscrição realizado com sucesso!',
        `Você se inscreveu para o meetapp, ${data.title}, que Ocorrerá no dia ${dateParsed}`
      );
    } catch (err) {
      console.tron.error(err);
    }
  }

  return (
    <Container past={data.past}>
      <Image source={{ uri: data.banner.url }} />
      <Content>
        <Title>{data.title}</Title>
        <InfoContent>
          <Icon name="event" size={20} color="#999" />
          <InfoContentText>{dateParsed}</InfoContentText>
        </InfoContent>
        <InfoContent>
          <Icon name="map" size={20} color="#999" />
          <InfoContentText numberOfLines={2}>{data.location}</InfoContentText>
        </InfoContent>
        <InfoContent last>
          <Icon name="person" size={20} color="#999" />
          <InfoContentText>Organizador: {data.organizer.name}</InfoContentText>
        </InfoContent>
        <Button
          enabled={!data.past}
          onPress={() => handleSubscription(data.id)}
        >
          Realizar Inscrição
        </Button>
      </Content>
    </Container>
  );
}
