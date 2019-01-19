import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Container,
  Row,
  Col,
  Input,
  ListGroup,
  ListGroupItem,
  Card, Button, CardImg, CardTitle, CardText, CardColumns,
 CardSubtitle, CardBody
} from 'reactstrap';
import gaucha from './img/gaucha.jpg';
import news from './news.json';
import escapeRegExp from 'escape-string-regexp'
import { Debounce } from 'react-throttle';

class App extends Component {
    state = {
      news: news.news,
      filteredNews: news.news
    }

    componentDidMount = () => {
      console.log(news);
    }

    filterNews = (query) => {
      const match = new RegExp(escapeRegExp(query), 'i');
      this.setState({
        filteredNews: this.state.news.filter(n => match.test(n.title))
      })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="text-center"><img src={gaucha} alt="logo" style={{height: '150px'}}/></Col>
                </Row>
                <Row>
                    <Col><h1 className="title">Notícias</h1></Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                      <Debounce time="400" handler="onChange">
                        <Input
                          onChange={(event) => this.filterNews(event.target.value)}
                          placeholder="Filtrar notícia"
                          bsSize="lg"
                        />
                      </Debounce>
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <CardColumns>
                          {
                            this.state.filteredNews &&
                            this.state.filteredNews.map((n, index) =>
                              <Card>
                                <CardImg
                                  top
                                  width="100%"
                                  src={n.img}
                                  alt="Card image cap" />
                                <CardBody>
                                  <CardTitle>{n.title}</CardTitle>
                                  <CardText>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum nam totam quam sed assumenda explicabo sint.</CardText>
                                </CardBody>
                              </Card>
                            )
                          }
                          </CardColumns>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
