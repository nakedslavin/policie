import React from 'react'
import { View, ScrollView } from 'react-native'
import {
  Divider, Screen, Caption, Image, 
  Heading, Text,
  Subtitle} from '@shoutem/ui'
import { SafeAreaView } from 'react-navigation'
import { ModalHeader, Loading } from './Header'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { articleIsLoaded: false, article: {} }
  }
  static navigationOptions = {
    headerTitle: 'Detail'
  };
  async updateArticle(link) {
    this.setState({articleIsLoaded: false })
    let address = 'https://policieapi.azurewebsites.net/api/articles/get?link=' + link
    console.log(address)
    let res = await fetch(address)
    let article = await res.json()
    this.setState({article: article})
    this.setState({articleIsLoaded: true })
  }
  async componentWillMount() {
    this.setState({ fontsAreLoaded: true })
    const link = this.props.navigation.getParam('link')
    await this.updateArticle(link)
  }

  render() {
    if (!this.state.articleIsLoaded) {
      return <Loading/>
    }
    return (
      <Screen>
        <SafeAreaView>
          <ModalHeader {...this.props} />
          <Divider styleName="line" />
          <View style={{backgroundColor: 'white', marginBottom: 40, paddingBottom: 120}}>
            <ScrollView style={{padding:20 }}>
              <Heading>{this.state.article.title}</Heading>
              <Divider styleName="section-header" style={{ marginTop: 20, justifyContent:'center', paddingTop:8 }}>
                <Caption>{this.state.article.authorDate}</Caption>
              </Divider>
              <Image
                style={{marginTop:30}}
                styleName="medium-wide"
                source={this.state.article.imageSrc ? {url: 'https://policieapi.azurewebsites.net/api/image/get?link=' +this.state.article.imageSrc} : require('../assets/default.jpg')}
              />
              <Text style={{paddingTop:20, fontSize: 14}}>{this.state.article.desc}</Text>
              <Divider />
            </ScrollView>
          </View>
        </SafeAreaView>
      </Screen>
    )
  }
}

export default Detail