import React from 'react';
import ReactDOM from 'react-dom';
import './QuoteBox.scss';

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
      newText: false
    };

    //this.newQuote = this.newQuote.bind(this);    
  }

  componentDidMount() {
    this.newQuote();
  }

  componentDidUpdate() {
    document.getElementById('text').setAttribute("class","quoteText changeOpacity");
  }

  componentWillUpdate() {
    document.getElementById('text').setAttribute("class","quoteText");
  }

  newQuote = () => {
    let randomQuote =
      quotesCollection[Math.floor(Math.random() * quotesCollection.length)];

    this.setState({
      text: randomQuote.quote,
      author: randomQuote.author,
      newText: true
    });
  };

  tweetUrl = () => {
    return 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.state.text + '" ' + this.state.author);
  }

  render() {

    return (
      <div>
          <p id="text"><i className="fa fa-quote-left" /> {this.state.text}</p>
          <p id="author" className={"authorText "}>- {this.state.author}</p>
        <div className="buttons">
          <button id="new-quote" className="button" onClick={this.newQuote}>New Quote</button>
          <a id="tweet-quote" className="button" href={this.tweetUrl()} target="_blank">
            <i className="fa fa-twitter" />
          </a>
        </div>
      </div>
    );
  }
}


export default QuoteBox;
