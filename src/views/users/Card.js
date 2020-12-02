import React, { useState, useEffect } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCol,
    CRow,

} from '@coreui/react'

import card from './card_data'
import post_card from './post_card_result'


class Education extends React.Component {

  constructor(props, context){
        super(props, context);
        this.state = {
            levels: [1,2,3,4,5,6,7,8,9,10],
            data: [],
            result: {},
        };
        this.sendResult = this.sendResult.bind(this);
    }

  componentDidMount() {
    card.getCardData('students', (res) => {
      if (!res.error) {
          this.setState({
            'active_level': res.result.result['current_level'],
            'data': res.result.result['questions']
          });
      }
      else{
        this.setState({'active_level': res.result.result['current_level']}) //TODO needs refactoring
      }
  });
  }

  handleChange(q_name, q_value) {
       // TODO CODE 001 int type
      this.state.result[parseInt(q_name)] = parseInt(q_value);
  }

  sendResult() {
      let payload = this.state.result;
      post_card.postCardResult(payload, (res) => {
          if (!res.result.detail.error){
              this.setState({'price_data': res})
          }
      });
  }

  render() {
    return (
  <>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" className="card-title mb-0">Levels</h4>
          </CCol>
          <CCol sm="7" className="d-none d-md-block">
            <CButtonGroup className="float-right mr-3">
              {
                this.state.levels.map(value => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === this.state.active_level}
                  >
                    {value}
                  </CButton>
                ))
              }
            </CButtonGroup>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter>
        <CRow className="text-left">
          <CCol xl sm="21" className="w-25 p-3">
              <form>
                   {this.state.data.map(value => (
                <div key={value['id']}>
                    {value['name']}
                    <br/>
                    {value['answer_variants'].map(v => (
                        <label key={v['id']} htmlFor={v['id']}>
                            <br/>
                        <input
                            key={v['id']}
                            name={value['id']}
                            type="radio"
                            onChange={
                                (e) => this.handleChange(value['id'], v['id'], e)
                            }
                        />{v['name']}<br/>
                        </label>
                     ))}
                </div>
                ))}

              </form>
              <button onClick={this.sendResult}> Send result</button>
          </CCol>
          <CCol sm="3" className="w-25 p-3">
            <div className="text-muted">Mark</div>
            <strong>will be soon</strong>
          </CCol>
        </CRow>
      </CCardFooter>
    </CCard>
    </>
  )
    }
  }

export default Education
