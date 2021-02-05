import React from 'react';
import AdvText from './AdvText';

class Table extends React.Component {
  constructor() {
    super();

    this.handleAddColumn = this.handleAddColumn.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
  }

  handleBodyChange(column, row, id, text) {
    this.adjustRowTitle(row);

    let body = JSON.parse(JSON.stringify(this.props.body));

    if(text == "") {
      delete body[column].notes[row];
    }
    else {
      body[column].notes[row] = text;
    }

    this.props.handleBodyChange(body);
  }

  adjustRowTitle(row) {
    let table_body = document.getElementById(row);
    let table_topic = document.getElementById(row+"t");
    let table_size = table_body.getBoundingClientRect();

    table_topic.style.height = (table_size.height-2)+"px";
  }

  handleAddColumn() {
    this.props.addColumn();
  }

  handleAddRow() {
    this.props.addRow();
  }

  renderTableHeader() {
    var columns = this.props.columns;
    var row = [];

    for(var i = 0; i < columns.length; ++i) {
      row.push(
          <th className="topic-container"
               style={{height:41.5}}
               value={columns[i]}
               key={i}
          >
              <p className="row-topic">
                  {columns[i]}
              </p>
          </th>
      );
    }

    return <tr>{row}</tr>;
  }

  render() {
    var columns = this.props.columns;
    var rows = this.props.rows;
    var table = [];

    if(columns.length > 0) {
      var row = [];
      var addCol = "";
      var addRow = "";

      if(this.props.editable) {
        addCol = (
          <button
            className="row-topic add-btn"
            onClick={this.handleAddColumn()}
            style={{
              position: "relative",
              left: "26px",
              top: "15px"
            }}
          >
            |||
          </button>
        );
        addRow = (
          <button
            className="row-topic add-btn rotate-90"
            onClick={this.handleAddRow()}
            style={{
              position: "relative",
              top: "12px",
              left: "5px"
            }}
          >
            |||
          </button>
        );
      }

      var row_labels = [
        <div className="topic-container"
            style={{
              height:67.5,
              backgroundColor:"#c6d2d7"
            }}
        >
            {addRow}
            {addCol}
        </div>
      ];

      for(var r = 0; r < rows.length; ++r) {
        row = [];

        for(var c = 0; c < columns.length; ++c) {
          var id = rows[r]+columns[c];
          let className = (this.props.body[columns[c]].notes.hasOwnProperty(rows[r])?"":"empty");

          row.push(
                <td>
                  <AdvText
                    data={(this.props.body[columns[c]].notes.hasOwnProperty(rows[r]))
                          ?this.props.body[columns[c]].notes[rows[r]]
                          :""
                        }
                    onReady={this.adjustRowTitle.bind(this, rows[r])}
                    onChange={this.handleBodyChange.bind(this, columns[c], rows[r], id)}
                    id={id}
                    className={className}
                    disabled={!this.props.editable}
                    key={id}
                  />
                </td>
          );
        }

        row_labels.push(
          <div
            className="topic-container topics"
            id={rows[r]+"t"}
            value={rows[r]}
            key={r}
          >
              <p className="row-topic">
                  {rows[r]}
              </p>
          </div>
        );

        table.push(
          <tr
            id={rows[r]}
            className="table-row"
            key={r+"r"}
          >
              {row}
          </tr>
        );
      }
    }

    return (
        <div className="" style={{ display:"flex" }} >
            <div>
              {row_labels}
            </div>

            <div className="table-display">
                <table className="table-container">
                    <thead>
                      {this.renderTableHeader()}
                    </thead>

                    <tbody>
                      {table}
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
}

export default Table;
