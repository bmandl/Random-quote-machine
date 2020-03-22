import React from 'react';
import ContentEditable from "react-contenteditable";
import './QuoteBox.scss';
import axios from 'axios';

const quotesCollection = [
  {
    quote:
      "You know you’re in love when you can’t fall asleep because reality is finally better than your dreams.",
    author: "Dr. Suess"
  },
  {
    quote:
      "I’m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can’t handle me at my worst, then you sure as hell don’t deserve me at my best.",
    author: "Marilyn Monroe"
  },
  {
    quote: "Get busy living or get busy dying.",
    author: "Stephen King"
  },
  {
    quote:
      "The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself.",
    author: "Mark Caine"
  },
  {
    quote:
      "When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.",
    author: "Helen Keller"
  },
  {
    quote:
      "Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do.",
    author: "Mark Twain"
  },
  {
    quote:
      "When I dare to be powerful – to use my strength in the service of my vision, then it becomes less and less important whether I am afraid.",
    author: "Audre Lorde"
  },
  {
    quote:
      "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    author: "Eleanor Roosevelt"
  },
  {
    quote: "Those who dare to fail miserably can achieve greatly.",
    author: "John F. Kennedy"
  }
];

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
    axios.get('/api/get').then(obj => {
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
    axios.post('/api/add',
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
