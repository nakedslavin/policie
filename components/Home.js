import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import {
  DropDownMenu, ListView, Divider, 
  Row, Screen, Subtitle, Caption, Image, 
  TouchableOpacity } from '@shoutem/ui'
import { SafeAreaView } from 'react-navigation'
import { Header ,Loading } from './Header'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { articlesAreLoaded: false, regionsAreLoaded:false, articles: [], regions: [], selectedRegion: {} }
  }
  static navigationOptions = {
    headerTitle: 'Home'
  };
  selectArticle(link) {
    this.props.navigation.navigate('Detail', { link: link })
  }
  async updateArticles(reg) {
    reg = reg || this.state.selectedRegion
    this.setState({articlesAreLoaded: false })
    let address = 'https://policieapi.azurewebsites.net/api/articles/list/'+ reg.code
    let res = await fetch(address)
    let articles = await res.json()
    this.setState({articles: articles})
    this.setState({articlesAreLoaded: true })
  }
  async updateRegions() {
    this.setState({regionsAreLoaded: false})
    let res = await fetch('https://policieapi.azurewebsites.net/api/regions')
    var regions = await res.json()
    for(var r in regions) {
      regions[r].name = regions[r].name.replace('Krajské ředitelství policie','KŘP')
    }
    this.setState({regions: regions})
    this.setState({selectedRegion: this.state.regions[0]})
    this.setState({regionsAreLoaded: true })
  }
  async componentWillMount() {
    await this.updateRegions()
    await this.updateArticles()
    this.state.articles.map(a => console.log(a.imageSrc))
  }
  renderRow(article) {
    return (
      <View>
        <Row>
          <Image
            styleName="small rounded-corners"
            source={{ uri: 'https://policieapi.azurewebsites.net/api/image/get?link=' + article.imageSrc}}
          />
          <TouchableOpacity onPress={() => this.selectArticle(article.link)}>
            <View styleName="vertical stretch space-between" style={{paddingRight: 80 }}>
              <Subtitle>{article.title}</Subtitle>
              <Text numberOfLines={4}>{article.desc}</Text>
              <Caption>{article.authorDate}</Caption>
            </View>
          </TouchableOpacity>
        </Row>
        <Divider styleName="line" />
      </View>
    );
  }
  render() {
    const {height, width} = Dimensions.get('window')
    if (!this.state.regionsAreLoaded) {
      return <Loading/>
    }
    return (
      <Screen>
        <SafeAreaView>
        <Header title="POLICIE ČR" />
        <Divider styleName="line" />
        <DropDownMenu
          styleName="horizontal"
          options={this.state.regions}
          selectedOption={this.state.selectedRegion }
          onOptionSelected={(reg) => { 
              this.setState({ selectedRegion: reg })
              this.updateArticles(reg)
            }
          }
          titleProperty="name"
          valueProperty="code"
        />
        <Divider styleName="line" />
        <ListView
          data={this.state.articles}
          renderRow={this.renderRow.bind(this)}
          loading={!this.state.articlesAreLoaded}
          onRefresh={async () => { await this.updateArticles() }}
        />
        </SafeAreaView>
      </Screen> 
    )
  }
}
export default Home