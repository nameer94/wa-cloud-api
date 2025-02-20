import React, { useState } from "react";
import { Text, StyleSheet, Button, TextInput, Image, TouchableOpacity, View } from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";

import { addPhoneNumber } from "../services/httpservice";

function submitForm(navigation, number) {
	addPhoneNumber(number).then(result => {
		if (result.ok)
			navigation.navigate("Chat", { user_id: number, username: result.data });
	});
}

export default function AddPhoneScreen({ navigation }) {
	const [number, setNumber] = useState("");
	return (
		<Screen style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate("Home")}>
				<Image style={styles.buttonBack}
					source={require("../assets/back.png")}
				/>
			</TouchableOpacity>
			<Text style={styles.text}>
				Ingrese un nuevo número de teléfono:
			</Text>
			<TextInput style={styles.input} placeholder="Agregar número" value={number} onChangeText={setNumber} />
			<View style={styles.buttonContainer}>
				<Button style={styles.button} title="Agregar" color={colors.primary}
					onPress={() => submitForm(navigation, number.replace(/\D/g, ""))}
				/>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		alignItems: "center",
	},
	container: {
		flex: 1,
	},
	buttonBack: {
		height: 30,
		width: 30,
		marginTop: 8,
		marginLeft: 8,
		backgroundColor: colors.primary,
		borderRadius: 15,
	},
	text: {
		fontSize: 20,
		margin: 10,
	},
	input: {
		margin: 10,
		borderColor: "gray",
		borderWidth: 1,
		fontSize: 20,
		borderRadius: 10,
		padding: 5,
	},
	button: {
		margin: 10,
	},
});
