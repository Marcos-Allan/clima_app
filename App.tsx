// IMPORTAÇÃO DOS HOOKS DO REACT USADOS PARA GERENCIAR STATUS E ATUALIZÁ-LOS NO LAYOUT
import { useState, useEffect } from 'react'

//IMPORTAÇÃO DA BARRA DE STATUS UTLIZADA PELO EXPO
import { StatusBar } from 'expo-status-bar';

//IMPORTAÇÃO DOS  COMPONENTES ESTILIZADOS
import {
  Screen,
  FirstMessage,
  Timer,
  Container,
  Img,
  Temperature,
  TitleInfo,
  Infos,
  Row,
  Texto,
  Destaque
} from './style'

// IMPORTAÇÃO DA BIBLIOTECA QUE CONSOME AS REQUISIÇÕES
import axios from 'axios'

// DECLARAÇÃO DA CHAVE DA API E DO HOST
const API_KEY = '3584d3b889mshf5d684ed9dfce94p121596jsnfc8b881ca9c2'
// const API_KEY = 'a9cd1dfa31msh7921854d3f733f0p101924jsnb5a8bacbc0e5'

export default function App(){
    
  const [bg, setBg] = useState<string>('')
  const [msg, setMsg] = useState<string>('')
  const [actualTime, setActualTime] = useState<string>('')
  const [location, setLocation] = useState<any>({ latitude: -23.5015, longitude: -46.6240 })
  const [api, setApi] = useState<any>()

  //FUNÇÃO PARA PEGAR PS DADOS DA API
  async function getData(location){
    const options = {
      method: 'GET',
      url: 'https://tomorrow-io1.p.rapidapi.com/v4/weather/forecast',
      params: {
        location: `${location.latitude} ${location.longitude}`,
        timesteps: '1h',
        units: 'metric'
      },
      headers: {
        //CHAVES DA API EMAIL 2
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'tomorrow-io1.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      setApi(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  //FUNÇÃO RESPONSÁVEL POR MUDAR A COR DO APLICATIVO DEPENDENDO DO HORÁRIO DO DIA
  function setBgColor(hour:number){
    if(hour >= 6 && hour < 12){
      setBg('#e2d386')
      setMsg('Bom Dia')
    }
    else if(hour >= 12 && hour < 20){
      setBg('#1f9fe9')
      setMsg('Boa Tarde')
    }
    else if((hour >= 20) || (hour >= 0 && hour < 6)){
      setBg('#526cbb')
      setMsg('Boa Noite')
    }
  }

  //FUNÇÃO UTILIZADA PARA ATUALIZAR O HORÁRIO DO RELÓGIO
  function refreshTime(){
    const hour = new Date().getHours()
    const minutes = new Date().getMinutes()
    const seconds = new Date().getSeconds()
    setActualTime(
      //COLOCA OS HORÁRIOS EM PADRÃO DE 2 NÚMEROS
      `${hour <= 9 ? `0${hour}` : hour}:${minutes <=9 ? `0${minutes}` : minutes}:${seconds <=9 ? `0${seconds}` : seconds}`)
    setBgColor(hour) 
  }

  //FUNÇÃO CHAMADA A CADA 1 SEGUNDO PARA PEGAR O HORÁRIO ATUAL (necessita da chamada da função anterior)
  setInterval(() => {
    refreshTime()
  }, 1000);
  
  // HOOK DO REACT CHAMADO QUANDO OS DA DOS DA APLICAÇÃO INICIAL SÃO CARREGADOS (dados iniciais, como o layout, conteudos consumidos ou chamados com o aplicativo funcional não são carregados)
  useEffect(() => {
    getData(location);
  }, []);

    return(
      <Screen $bgcolor={bg}>
          <FirstMessage>{msg}</FirstMessage>
          <Timer>{actualTime}</Timer>

          
            {api ? (
              <>
              <Container>
                {bg == '#e2d386' && (
                  <Img source={require('./assets/icons/001.png')} />
                )}
                {bg == '#1f9fe9' && (
                  <Img source={require('./assets/icons/001.png')} />
                )}
                {bg == '#526cbb' && (
                  <Img source={require('./assets/icons/005.png')} />
                )}
                <Temperature>{api.timelines.hourly[0].values.temperature.toFixed(0)}° C</Temperature>
              </Container>

              <TitleInfo>Outras informações</TitleInfo>
              <Infos>
                <Row>
                  <Texto>Umidade do ar: </Texto><Destaque>{api.timelines.hourly[0].values.humidity}%</Destaque>
                </Row>
                <Row>
                  <Texto>Velocidade do vento: </Texto><Destaque>{api.timelines.hourly[0].values.windSpeed.toFixed(1)} Km/h</Destaque>
                </Row>
                <Row>
                  <Texto>Chance de chover: </Texto><Destaque>{api.timelines.hourly[0].values.rainIntensity}%</Destaque>
                </Row>
              </Infos>
              </>
            ) : (
              <>
                <Container>
                  {bg == '#e2d386' && (
                    <Img source={require('./assets/icons/001.png')} />
                  )}
                  {bg == '#1f9fe9' && (
                    <Img source={require('./assets/icons/001.png')} />
                  )}
                  {bg == '#526cbb' && (
                    <Img source={require('./assets/icons/005.png')} />
                  )}
                  <Temperature>34° C</Temperature>
                </Container>

                <TitleInfo>Outras informações</TitleInfo>
                <Infos>
                  <Row>
                    <Texto>Umidade do ar:</Texto><Destaque>32%</Destaque>
                  </Row>
                  <Row>
                    <Texto>Velocidade do vento: </Texto><Destaque>23 Km/h</Destaque>
                  </Row>
                  <Row>
                    <Texto>Chance de chover: </Texto><Destaque>45%</Destaque>
                  </Row>
                </Infos>
              </>
            )}
            <StatusBar style="auto" />
        </Screen>
    )
}