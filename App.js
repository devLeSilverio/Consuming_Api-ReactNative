import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button ,StatusBar } from 'react-native';
import api from './components/api'
class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      nome: '',
      curso: '',
      id: '',
    };
    this.loading = this.loading.bind(this);
    this.register = this.register.bind(this);
    this.change = this.change.bind(this);
    this.delete = this.delete.bind(this);
  }

  async loading(){
    const response = await api.get(`exemplo_api/pessoa/${this.state.id}`);
    this.setState({
      id: response.data.id,
      nome: response.data.nome,
      curso: response.data.curso
    });
  }

  register(){
    let bodyFormData = new FormData();
    bodyFormData.append('nome', `${this.state.nome}`);
    bodyFormData.append('curso', `${this.state.curso}`);

    api({
      method: "post",
      url: "exemplo_api/pessoa",
      data: bodyFormData,
      headers: {"Content-Type":"multpart/form-data"}
    }).then(function(response){
      console.log(response);
    }).catch(function(response){
      console.log(response);
    });
  }

  async change(){
    const response = await api.put(`exemplo_api/pessoa/${this.state.id}`, 
    {nome:`${this.state.nome}`, curso:`${this.state.curso}`});
  }

  delete(){
    api.delete(`exemplo_api/pessoa/${this.state.id}`);
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CRUD API</Text>
        <StatusBar style="auto" />

        <TextInput style={styles.input} keyboardType="numeric" placeholder="  ID: "
         onChangeText={(value)=>this.setState({id:value})}
         />

        <View style={styles.button}>    
          <Button title="Buscar" onPress={this.loading}/>
        </View>

        <TextInput style={styles.input} placeholder=" Nome..." value={this.state.nome} 
          onChangeText={(value)=>this.setState({nome:value})}/>

        <TextInput style={styles.input} placeholder="  Curso..." value={this.state.curso} 
          onChangeText={(value)=>this.setState({curso:value})}/>

        <View style={styles.button}> 
          <Button title="Cadastrar" onPress={this.register}/>
        </View>

        <View style={styles.button}> 
          <Button title="Alterar" onPress={this.change}/>
        </View>

        <View style={styles.button}> 
          <Button title="Deletar" onPress={this.delete} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title:{
    fontSize:40,
  },
  input:{
    width:300,
    height:50,
    borderColor:'#000',
    borderWidth:2,
    marginTop:10,
    fontSize:20,
  },
  button:{
    width:300,
    marginTop:20,
    marginBottom:8,
  }
});


export default App; 