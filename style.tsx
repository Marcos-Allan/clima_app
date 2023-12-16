import styled from 'styled-components/native'

export const Screen = styled.View<{ $bgcolor?: string; }>`
    background-color: ${props => props.$bgcolor};
    padding-top: 50px;
    flex-grow: 1;
    align-items: center;
    justify-content: flex-start;
    overflow-y: hidden;
`;

export const FirstMessage = styled.Text`
    text-transform: capitalize;
    color: #f2f2f2;
    font-weight: bold;
    letter-spacing: 4px;
    font-size: 30px;
    margin: 40px 0px;
`;

export  const Timer = styled.Text`
    color: #f2f2f2;
    font-size: 24px;
    margin-bottom: 12px;
`;

export const Container = styled.View`
    display: flex;
    width: 65%;
    flex-direction: row;
    align-items: center;
    height: 17%;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 10px;
`;

export const Img = styled.Image`
    max-width: 120px;
    max-height: 120px;
`;

export const Temperature = styled.Text`
    flex-grow: 1;
    text-align: center;
    color: #f2f2f2;
    font-size: 30px;
    font-weight: 900;
    letter-spacing: 2px;
`;

export const TitleInfo = styled.Text`
    color: #f2f2f2;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 0px;
`;

export const Infos = styled.View`
    width: 90%;
    min-height: 52%;
    background-color: #f2f2f2;
    display: flex;
    justify-content: flex-start;
    border-radius: 8px;
    flex-direction: column;
    padding: 10px;
`;

export const Row = styled.View`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 10px 0px;
    border-bottom: 1px solid #000000;
`;

export const Texto = styled.Text`
    text-align: left;
    flex-grow: 1;
    color: #686868;
    font-weight: light;
    letter-spacing: 2px;
    font-size: 14px;
`;

export const Destaque = styled.Text`
    text-align: right;
    flex-grow: 1;
    color: #686868;
    font-weight: 900;
    letter-spacing: 2px;
    font-size: 14px;
`;

export const MessageError = styled.Text`
    min-height: 70%;
    margin-top: 50px;
    background-color: #f2f2f2;
    padding: 10px;
    font-weight: 300;
    border-radius: 8px;
    line-height: 26px;
    font-size: 18px;
    max-width: 90%;
    color: #000000;
    text-align: center;
`;