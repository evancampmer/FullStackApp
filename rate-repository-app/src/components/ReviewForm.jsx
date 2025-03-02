import Text from './Text';
import { useFormik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { useNavigate } from "react-router";
import useReviewForm from '../hooks/useReviewForm';


const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Owner name is required'),
    rating: yup
        .number()
        .min(1)
        .max(100)
        .required('Rating is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    text: yup
        .string()
        .notRequired()
})

const initialValues = {
    ownerName: '',
    rating: 0,
    repositoryName: '',
    text: ''
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

export const ReviewForm = ({onSubmit}) => {

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
      });
    
      return (
        <View  style={styles.container}>
            <TextInput
            style={(formik.errors.ownerName && formik.touched.ownerName)? styles.errorTextInput : styles.textInput}
            placeholder="ownerName"
            value={formik.values.ownerName}
            onChangeText={formik.handleChange('ownerName')}
          />
          {formik.touched.ownerName && formik.errors.ownerName && (
          <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>
          )}      
          <TextInput
            style={(formik.errors.rating && formik.touched.rating) ? styles.errorTextInput : styles.textInput}
            placeholder="rating"
            value={formik.values.rating}
            onChangeText={formik.handleChange('rating')}
          />
          {formik.touched.rating && formik.errors.rating && (
          <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
          )}
          <TextInput
            style={(formik.errors.repositoryName && formik.touched.repositoryName) ? styles.errorTextInput : styles.textInput}
            placeholder="repositoryName"
            value={formik.values.repositoryName}
            onChangeText={formik.handleChange('repositoryName')}
          />
          {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
          )}
          <TextInput
            style={styles.textInput}
            placeholder="text"
            value={formik.values.text}
            onChangeText={formik.handleChange('text')}
          />
          <Pressable onPress={formik.handleSubmit} style={styles.button}>
            <Text style={styles.text}>create a review</Text>
          </Pressable>
        </View>
      );
    };

const Review = () => {
  const [reviewForm] = useReviewForm();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
      const { ownerName, rating, repositoryName, text } = values
      console.log(ownerName, rating, repositoryName, text)
      try {
        const data = await reviewForm({ownerName, rating: Number(rating), repositoryName, text})
        console.log(data.data.createReview)
        navigate(`/${data.data.createReview.repositoryId}`)
      } catch (e) {
        console.log(e)
      }
    };
    return <ReviewForm onSubmit={onSubmit} />;
}    

export default Review;