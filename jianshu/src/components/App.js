/*
 * @Descripttion: 
 * @Author: 辛顺宁
 * @Date: 2019-08-15 11:29:33
 * @LastEditors: 辛顺宁
 * @LastEditTime: 2019-10-25 17:23:22
 */
import React, { Component, Fragment } from 'react';
import { Button } from 'element-react';
import '../common/style.css'
import { CHANGE_VALUE } from '../store/actionTypes'
import { getChangeValue } from '../store/actionCreator'
import store from '../store'
import axios from 'axios'

// pureComponent
class App extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.toggleBtn = this.toggleBtn.bind(this)
    store.subscribe(() => { this.setState(store.getState()) })
  }
  componentDidMount () {
    axios.get('http://neixun21.admin.baijiayun.com/api/statisticexam').then((res) => {
      const action = getChangeValue(res)
      console.log(action)
      store.dispatch(action)
    })
  }
  render () {
    return (
      <Fragment>
        <div>{this.state.show.statusText}</div>
        <Button onClick={this.toggleBtn} type='primary'>toggle</Button>
      </Fragment>
    )
  }
  toggleBtn () {
    const action = {
      type: CHANGE_VALUE,
      value: !this.state.show
    }
    store.dispatch(action)
    console.log(this.state)

    // this.setState((prevState) => ({
    //   show: !prevState.show
    // }))
  }

}

export default App