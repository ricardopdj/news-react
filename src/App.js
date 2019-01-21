import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Container,
  Row,
  Col,
  Input,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardColumns,
  CardBody
} from 'reactstrap';
import gaucha from './img/gaucha.jpg';
import escapeRegExp from 'escape-string-regexp'
import { Debounce } from 'react-throttle';

class App extends Component {
    state = {
      news: [],
      filteredNews: [],
      loading: true
    }

    loaded = () => {
      document.getElementById('loader').style.display = "none";
    }

    componentDidMount = () => {
      import("./news").then(content => {
        this.setState({
          news: content.news,
          filteredNews: content.news,
          loading: false
        })
        this.loaded();
      })
      .catch(() => {
        alert("Ops...Não foi possível carregar as notícias!");
      });
    }

    filterNews = (query) => {
      const match = new RegExp(escapeRegExp(query), 'i');
      this.setState({
        filteredNews: this.state.news.filter(n => match.test(n.title))
      })
    }

    render() {
        return (
            <Container className="h-100">
                <Row className={this.state.loading ? "invisible" : ""}>
                    <Col className="text-center">
                      <img src={gaucha} alt="logo" style={{height: '150px'}}/>
                    </Col>
                </Row>

                { !this.state.loading &&
                <div>
                <Row>
                    <Col><h3 className="title">Notícias</h3></Col>
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
                            this.state.filteredNews.map((n, index) =>
                              <Card key={index}>
                                <CardImg
                                  top
                                  width="100%"
                                  src={n.img}
                                  alt={n.title} />
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
                </div>
                }
            </Container>
        );
    }
}

export default App;
