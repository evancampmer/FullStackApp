import Text from './Text';
import { useFormik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from "react-router";


const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required')
})

const initialValues = {
    username: '',
    password: ''
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
      },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
      },
    errorTextInput: {
        height: 40,
        borderColor: 'red',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    button: {
        flex: 0,
        padding: 15,
        paddingTop: 15,
        borderRadius: 5,
        height: 50,
        backgroundColor: 'blue',
    },
    text: {
        flex: 0,
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

const SignInForm = ({onSubmit}) => {

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
      });
    
      return (
        <View  style={styles.container}>
            <TextInput
            style={(formik.errors.username && formik.touched.username)? styles.errorTextInput : styles.textInput}
            placeholder="username"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
          />
          {formik.touched.username && formik.errors.username && (
          <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
          )}      
          <TextInput
            style={(formik.errors.password && formik.touched.password) ? styles.errorTextInput : styles.textInput}
            secureTextEntry='true'
            placeholder="password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
          />
          {formik.touched.password && formik.errors.password && (
          <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
          )}
          <Pressable onPress={formik.handleSubmit} style={styles.button}>
            <Text style={styles.text}>Sign in</Text>
          </Pressable>
        </View>
      );
    };

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
      const { username, password } = values
      console.log(username, password)
      try {
        const data = await signIn({username, password})
        console.log(data.data.authenticate.accessToken)
        navigate("/")
      } catch (e) {
        console.log(e)
      }
    };
    return <SignInForm onSubmit={onSubmit} />;
}    

export default SignIn;