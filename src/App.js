import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Container,
  Row,
  Col,
  Input,
  ListGroup,
  ListGroupItem
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
                    <Col className="text-center"><img src={gaucha} alt="logo" style={{height: '100px'}}/></Col>
                </Row>
                <Row className="mb-3">
                    <Col className="text-center">
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
                    <Col className="text-center">
                        <ListGroup>
                          {
                            this.state.filteredNews &&
                            this.state.filteredNews.map((n, index) =>
                              <ListGroupItem key={index}>{n.title}</ListGroupItem>
                            )
                          }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
