import React, { useState, useEffect } from 'react'
// import {Redirect, useHistory, useLocation} from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import users from './users_data'


// function Counter() {
//     const history = useHistory();
//     const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
//     const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
//     const [page, setPage] = useState(currentPage);
//
//
//
//       useEffect(() => {
//       currentPage !== page && setPage(currentPage)
//     }, [currentPage, page]);
//
//     const pageChange = newPage => {currentPage !== newPage && history.push(`/students_chart?page=${newPage}`)};
//
//     return(<CPagination
//                 activePage={currentPage}
//                 onActivePageChange={pageChange}
//                 pages={2}
//                 doubleArrows={false}
//                 align="center"
//               />)
//
//
// }

class Students extends React.Component {

  constructor(props, context){
        super(props, context);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
      users.getUsers('student', (res) => {
            if (!res.error) {
                this.setState({'data': res.result.result})
            }
            else{
              this.setState({'data': res.result.result})
            }
        });
    }
    render() {
      return (
        <CRow>
          <CCol xl={6}>
            <CCard>
              <CCardHeader>
                Users
                <small className="text-muted"> example</small>
              </CCardHeader>
              <CCardBody>
              <CDataTable
                items={this.state.data}
                fields={['№', { key: 'name', _classes: 'font-weight-bold' }, 'total_mark']}
                hover
                striped
                itemsPerPage={2000}
                activePage={1}
                clickableRows
              />
              {/*<Counter/>*/}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )
    }
  }

export default Students
