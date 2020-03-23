import React from 'react';
import ContentEditable from "react-contenteditable";
import './QuoteBox.scss';
import axios from 'axios';


class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      author: "",
      animationRunning: false
    };

    this.quoteRef = React.createRef();
    this.authorRef = React.createRef();
    this.newQuote = this.newQuote.bind(this);
    this.changeQuote = this.changeQuote.bind(this);
    this.addQuote = this.addQuote.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
    this.restartAnimation = this.restartAnimation.bind(this);
  }

  componentDidMount() {
    this.newQuote();
  }

  componentDidUpdate() {
  }

  componentWillUpdate() {

  }

  stopAnimation() {
    this.setState({
      animationRunning: false
    });
  }

  restartAnimation() {
    this.setState({
      animationRunning: true
    })
  }

  newQuote = () => {    
    axios.get('/api/quote/get').then(obj => {
      let randomQuote = obj.data[Math.floor(Math.random() * obj.data.length)];
      this.setState(state => ({
        text: randomQuote.text,
        author: randomQuote.author,
        animationRunning: state.animationRunning ? false : true
      }))
    })
      .catch(err => { console.log(err) })
      .finally(() => { console.log('finished') })    
  }

  changeQuote = (event) => {
    this.setState({
      text: event.target.value,
      newText: true
    });
  }

  changeAuthor = (event) => {
    this.setState({
      author: event.target.value
    })
  }

  addQuote = () => {
    axios.post('/api/quote/add',
      {
        quote: this.state.text,
        author: this.state.author
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        if(res.data == 'Duplicate quote')alert(res.data)
        console.log(res.data);
      }, err => {
        console.log(err)
      })
  }

  tweetUrl = () => {
    return 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.state.text + '" ' + this.state.author);
  }

  render() {
    let styleQuote = this.state.animationRunning ? "quoteText changeOpacity" : "quoteText";
    let styleAuthor = this.state.animationRunning ? "authorText changeOpacity" : "authorText";
    return (
      <div>
        <div className="inLineQuote"><i className='fa fa-quote-left' /></div>
        <ContentEditable id="text" className={styleQuote} ref={this.quoteRef}
          onAnimationEnd={this.stopAnimation}
          html={this.state.text}
          disabled={false}
          onChange={this.changeQuote}
        />
        <div className={styleAuthor}>
          <p id="crta">-</p>
          <ContentEditable id="author" ref={this.authorRef}
            onAnimationEnd={this.stopAnimation}
            html={this.state.author}
            disabled={false}
            onChange={this.changeAuthor}
          />
        </div>
        <div className="buttons">
          <button id="new-quote" className="button" onClick={this.newQuote}>New Quote</button>
          <button id="add-quote" className="button" onClick={this.addQuote}>Add Quote</button>
          <a id="tweet-quote" className="button" href={this.tweetUrl()} target="_blank">
            <i className="fa fa-twitter" />
          </a>
        </div>
      </div>
    );
  }
}


export default QuoteBox;
