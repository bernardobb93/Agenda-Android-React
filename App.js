import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from "react-native";

export default function App() {
  const [estado, setarEstado] = useState("leitura");
  const [anotacao, setarAnotacao] = useState("");
  
  useEffect(()=>{
    (async()=>{
      try{
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setarAnotacao(anotacaoLeitura);
      }catch(error){

      }
    })();
  },[])


  setData=async()=>{
    try{
      await AsyncStorage.setItem('anotacao',anotacao)
    }catch(error){

    }
  }

  function atualizarTexto(){
    setarEstado('leitura');
    setData();
  }


  if (estado == "leitura") {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <View style={styles.header}>
          <Text
            style={{
              marginTop: 40,
              textAlign: "center",
              color: "white",
              fontSize: 18,
            }}
          >
            Aplicativo Anotação
          </Text>
        </View>
        {(anotacao!="")?
        <View style={{ padding: 20 }}>
          <Text style={styles.anotacao}>{anotacao}</Text>
        </View>
        :
        <View style={{ padding: 20 }}>
          <Text style={{opacity:0.3}}>Nenhuma anotação encontrada:</Text> 
          </View>
        }
        <TouchableOpacity
          onPress={() => setarEstado("atualizando")}
          style={styles.btnAnotacao}
        >
          {(anotacao=="")?
          <Text style={styles.btnAnotacaotexto}>+</Text>
         :
         <Text style={{fontSize:12,color:'white',textAlign:'center',marginTop:16}}>Editar</Text>
        } 
        </TouchableOpacity>
      </View>
    );
  } else if (estado == "atualizando") {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <View style={styles.header}>
          <Text
            style={{
              marginTop: 40,
              textAlign: "center",
              color: "white",
              fontSize: 18,
            }}
          >
            Aplicativo Anotação
          </Text>
        </View>

        <TextInput
          autoFocus={true}
          onChangeText={(text) => setarAnotacao(text)}
          style={{height:300,textAlignVertical:'top',padding:15}}
          multiline={true}
          numberOfLines={5}
          value={anotacao}

        ></TextInput>

        <TouchableOpacity
          onPress={() => atualizarTexto()}
          style={styles.btnAnotacao}
        >
          <Text style={styles.btnAnotacaosalvar}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#069",
  },
  anotacao: {
    fontSize: 14,
  },
  btnAnotacao: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: "#069",
    borderRadius: 25,
  },
  btnAnotacaotexto: {
    color: "white",
    position: "relative",
    textAlign: "center",
    top: 3,
    fontSize: 30,
  },
  btnAnotacaosalvar: {
    color: "white",
    position: "relative",
    textAlign: "center",
    top: 15,
    fontSize: 15,
  },
});
