import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, TextInput } from 'react-native';

class MovieScreen extends Component {

    state = {
        text: '',
        movieList: [],
    }

    componentDidMount = () => {
        axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=217fda704a2b86d77d3e0819f35f68d3')
        .then(response => {
            // console.log(response.data);
            this.setState({ movieList: response.data.results });
        });
    }

    handleSearch = () => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=217fda704a2b86d77d3e0819f35f68d3&query=${this.state.text}`)
        .then(response => {
            this.setState({ movieList: response.data.results })
        })
    };

    render() {

        const list = this.state.movieList.map(movie => (
            <View key={movie.id} style={{ height: 100 }}>
                <TouchableOpacity onPress={() => console.log(movie.title)}>
                    <Text style={{ textAlign: 'center' }}>Name: { movie.title }</Text>
                    <Text style={{ textAlign: 'center' }} >Vote Average: { movie.vote_average }</Text>
                </TouchableOpacity>
                <Button title="Movie detail"
                        onPress={() => this.props.navigation.navigate('DetailScreen', {
                            id: movie.id
                        })} />
            </View>
        ));

        return (
            <ScrollView>

                <View style={{ marginBottom: 50, marginTop: 50 }}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({text})}
                        placeholder="type the movie name here?"
                        value={this.state.text}
                    />
                    <Button title="search" onPress={this.handleSearch} />
                </View>


                <Text style={{ color: 'blue', fontSize: 25, textAlign: 'center', paddingBottom: 40 }}>Movie List</Text>
                {list}
            </ScrollView>

        );
    }
}

export default MovieScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});