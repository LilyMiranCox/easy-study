import React from 'react';
import AdvText from './AdvText';

class Table extends React.Component {
  tableHeader() {
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

    return <tr className="top-row">{row}</tr>;
  }

  adjustRowTitle(row) {
    let table_body = document.getElementById(row);
    let table_topic = document.getElementById(row+"t");
    let table_size = table_body.getBoundingClientRect();

    table_topic.style.height = (table_size.height-2)+"px";
  }

  handleBodyChange = (column, row, id, text) => {
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

  handleAddColumn() {
    console.log("Add a column!");
    this.props.addColumn();
  }

  handleAddRow() {
    console.log("Add a row!");
    this.props.addRow();
  }

  render() {
    var columns = this.props.columns;/*Object.keys(this.state.languages);*/
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
            onClick={this.handleAddColumn.bind(this)}
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
            onClick={this.handleAddRow.bind(this)}
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
              height:63,
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
          let className = (this.props.body[columns[c]].notes.hasOwnProperty(rows[r])?"":"empty")
          row.push(
                <td>
                  <AdvText
                    data={(this.props.body[columns[c]].notes.hasOwnProperty(rows[r]))?this.props.body[columns[c]].notes[rows[r]]:""}
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
        <div
          className=""
          style={{
            display:"flex"
          }}
        >
            <div>
              {row_labels}
            </div>

            <div className="table-display">
                <table className="table-container">
                    <thead>
                      {this.tableHeader()}
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
