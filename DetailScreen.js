import React, { Component } from 'react';
import axios from 'axios';

import { View, Text, StyleSheet } from 'react-native';

class DetailScreen extends Component {

    state = {
        "homepage": '',
        "id": '',
        "imdb_id": "",
        "original_language": "",
        "original_title": "",
        "overview": "",
        "popularity": '',
    }

    componentDidMount = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.navigation.state.params.id}?api_key=217fda704a2b86d77d3e0819f35f68d3`) 
        .then(response => {
            const { homepage, id, imdb_id, original_language, original_title, overview, popularity } = response.data;
            this.setState({
                homepage,
                id,
                imdb_id,
                original_language,
                original_title,
                overview, 
                popularity,
            });
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Homepage: {this.state.homepage} </Text>
                <Text> Id: {this.state.id} </Text>
                <Text> imdb_id: {this.state.imdb_id} </Text>
                <Text> Original_language: {this.state.original_language} </Text>
                <Text> Overview: { this.state.overview } </Text>
                <Text> Original_title: {this.state.original_title} </Text>
                <Text> Popularity: {this.state.popularity} </Text>  
            </View>
        );
    }
}

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});