import React from 'react';
import OnOffSwitch from './OnOffSwitch';
import Table from './Table';

class MainComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      display_langs: [],
      editable: false,
      lang_data: {},
      shown_topics: []
    };
    //{'JavaScript':{'Class':'Class info', 'Prototype':'Info', 'JavaScript':'Just JavaScript!'}, 'Java':{'Class':'Class info', 'Prototype':'Info', 'Java':'Just Java! Wow this is so cool and Im so glad that it is acting in this way'}, 'C++':{'Class':'Class info', 'Prototype':'Info', 'C++':'Just C++! Here is a long statement that shows that the topic on the side will grow to be the correct length wow look at that, certainly interesting'}, 'C#':{'Class':'Class info', 'Prototype':'Info', 'C#':'Just C#!'}, 'Python':{'Class':'Class info', 'Prototype':'Info', 'Python':'Just Python!'}}
    this.lang_data = {};
  }
  componentDidMount() {
    this.loadLanguageData();
  }

  loadLanguageData() {
    fetch('http://localhost:3001/languages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Success got:', data);
        let lang_data = {};
        for (let i = 0; i < data.requestBody.length; ++i) {
          lang_data[data.requestBody[i].title] = data.requestBody[i];
        }

        console.log("lang_data", lang_data);
        this.setState({ lang_data: lang_data });
        this.lang_data = lang_data;
      })
      .catch((error) => {
        console.error('Error got:', error);
      })
  }

  saveLanguageData() {
    fetch('http://localhost:3001/languages', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.lang_data)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  checkTopic(languages, topic) {
    for (let i = 0; i < languages.length; ++i) {
      if (this.state.lang_data[languages[i]].notes.hasOwnProperty(topic)) {
        return true;
      }
    }

    return false;
  }

  language_selected = (language, context) => {
    var checked = document.getElementById(language + "l").checked;

    var shown_langs = [...this.state.display_langs];
    var shown_topics = [...this.state.shown_topics];

    if (checked == true) {
      shown_langs.push(language);

      //var shown_topics = Array.from(new Set([...Object.keys(this.state.shown_topics), ...Object.keys(this.state.lang_data[language].notes)]));
      shown_topics = shown_topics.concat(Object.keys(this.state.lang_data[language].notes).filter((topic) => shown_topics.indexOf(topic) < 0));
    }
    else {
      // Remove the language that was unchecked
      shown_langs = this.state.display_langs.filter(lang => lang != language);
      // Remove topics that only that language used
      shown_topics = this.state.shown_topics.filter(this.checkTopic.bind(this, shown_langs));
    }

    this.setState({ display_langs: shown_langs, shown_topics: shown_topics });
  }

  switchEditMode(e) {
    this.setState({ editable: !this.state.editable });
  }

  handleBodyChange(body) {
    this.setState({ lang_data: body });
  }

  addColumn() {
    console.log("Add a column in parent!");
  }

  addRow() {
    console.log("Add a row in parent!");
  }

  sideMenu() {
    var language_select = [];

    var all_langs = Object.keys(this.state.lang_data);
    for (var i = 0; i < all_langs.length; ++i) {
      language_select.push(
        <label
          className="check-select"
          key={i}
          onClick={this.language_selected.bind(this, all_langs[i])}
        >
          {all_langs[i]}

          <input
            type="checkbox"
            id={all_langs[i] + "l"}
          />

          <span className="checkmark"></span>
        </label>
      );
    }

    return language_select;
  }

  render() {
    return (
      <div>
        <div
          style={{
            marginTop: "0px",
            marginBottom: "25px",
            paddingTop: "14px",
            paddingBottom: "14px",
            display: "flex",
            backgroundColor: "#2d466a"
          }}
        >
          <div
            style={{width:"28px", height:"28px", backgroundColor:"white", marginLeft:"10px"}}
          >

          </div>
          <h2
            style={{
              fontWeight: "100",
              color: "white",
              margin: "0",
              paddingLeft: "20px"
            }}
          >
            Study Buddy
          </h2>
        </div>

        <div>
          <div
            className="lang-selector card bg-light text-dark"
          >
            <div className="admin-panel">
              <button
                className="save-btn"
                onClick={this.saveLanguageData.bind(this)}
              >
                Save
                  </button>

              <OnOffSwitch
                onClick={this.switchEditMode.bind(this)}
              />
            </div>
            <div>
              {this.sideMenu()}
            </div>
          </div>

          <Table
            columns={this.state.display_langs}
            rows={this.state.shown_topics}
            body={this.state.lang_data}
            handleBodyChange={this.handleBodyChange.bind(this)}
            addColumn={this.addColumn.bind(this)}
            addRow={this.addRow.bind(this)}
            editable={this.state.editable}
          />
        </div>
        <div
          style={{
            marginTop:"30px"
          }}
        >
          <p
            style={{
              textAlign:"center",
              fontSize:"13px",
              color:"#5e5e5e"
            }}
          >Lily Cox, 2021</p>
        </div>
      </div>
    );
  }
}

class SubComponent extends React.Component {
  render() {
    return (
      <div className="card bg-light text-dark m-5">
        <p className="mx-4">
          {this.props.text}
        </p>
      </div>
    );
  }
}

export default MainComponent;
