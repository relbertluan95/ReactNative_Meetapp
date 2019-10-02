import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 10px;
`;

export const ControlDate = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Date = styled.Text`
  color: #eee;
  font-size: 18px;
  font-weight: bold;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 15 },
})``;
