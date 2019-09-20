import styled from 'styled-components/native';

export const Container = styled.View.attrs({
  // elevation: 10,
})`
  background-color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0 0 10px 0;
  margin: 10px 0;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 160px;
  align-content: stretch;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Content = styled.View`
  padding: 15px;
`;

export const Title = styled.Text`
  font-size: 16;
  font-weight: bold;
`;

export const InfoContent = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;

  ${({ last }) =>
    last &&
    `
    margin-bottom: 20px;
  `}
`;

export const InfoContentText = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 16;
  color: #999;
  margin-left: 10px;
`;
