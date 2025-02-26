import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const getToken = await AsyncStorage.getItem(
        `${this.namespace}:token`
    )
    return getToken ? JSON.parse(getToken) : []
  }

  async setAccessToken(accessToken) {
    const currentToken = await this.getAccessToken();
    if(currentToken === null) {
        await AsyncStorage.setItem(
            `${this.namespace}:token`,
            JSON.stringify(accessToken)
        )
    }
    else {
        this.removeAccessToken()
        await AsyncStorage.setItem(
            `${this.namespace}:token`,
            JSON.stringify(accessToken)
        )
    }
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;