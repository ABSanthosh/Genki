class GoogleUser {
  constructor(
    props = {
      id: "",
      uid: "",
      avatar: "",
      email: "",
      isEmailVerified: "",
      name: "",
      providerId: "",
    }
  ) {
    this.id = props.id;
    this.uid = props.uid;
    this.name = props.name;
    this.email = props.email;
    this.avatar = props.avatar;
    this.providerId = props.providerId;
    this.isEmailVerified = props.isEmailVerified;
  }
}

class GithubUser {
  constructor(
    props = {
      id: "",
      uid: "",
      avatar: "",
      email: "",
      isEmailVerified: "",
      name: "",
      preferredName: "",
      providerId: "",
    }
  ) {
    this.id = props.id;
    this.uid = props.uid;
    this.name = props.name;
    this.email = props.email;
    this.avatar = props.avatar;
    this.providerId = props.providerId;
    this.preferredName = props.preferredName;
    this.isEmailVerified = props.isEmailVerified;
  }
}
class User {
  constructor(
    props = {
      uid: "",
      email: "",
      provider: "",
      otherProviders: "",
      GoogleUserData: "",
      GithubUserData: "",
      confirmationDetails: "",
    }
  ) {
    this.uid = props.uid;
    this.email = props.email;
    this.provider = props.provider;
    this.otherProviders = props.otherProviders;
    this.GoogleUserData = props.GoogleUserData;
    this.GithubUserData = props.GithubUserData;
    this.confirmationDetails = props.confirmationDetails;
  }
}

function getGoogle(userData) {
  const provider = userData.identities.filter((provider) => {
    return provider.provider === "google";
  })[0];
  let googleData = new GoogleUser({
    id: provider.id,
    uid: provider.user_id,
    providerId: provider.identity_data.provider_id,
    email: provider.identity_data.email,
    name: provider.identity_data.full_name,
    avatar: provider.identity_data.avatar_url,
    isEmailVerified: provider.identity_data.email_verified,
  });

  return googleData;
}

function getGithub(userData) {
  const provider = userData.identities.filter((provider) => {
    return provider.provider === "github";
  })[0];
  let githubData = new GithubUser({
    id: provider.id,
    uid: provider.user_id,
    name: provider.identity_data.name,
    email: provider.identity_data.email,
    avatar: provider.identity_data.avatar_url,
    providerId: provider.identity_data.provider_id,
    isEmailVerified: provider.identity_data.email_verified,
    preferredName: provider.identity_data.preferred_username,
  });
  return githubData;
}

function parseUserData(userData) {
  let user = new User({
    uid: userData.id,
    email: userData.email,
    provider: userData.app_metadata.provider,
    otherProviders: userData.app_metadata.providers,
    GoogleUserData: getGoogle(userData),
    GithubUserData: getGithub(userData),
    confirmationDetails: {
      email_confirmed_at: userData.email_confirmed_at,
      confirmed_at: userData.confirmed_at,
      last_sign_in: userData.last_sign_in_at,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
    },
  });

  return user;
}

export { GoogleUser, GithubUser, User, parseUserData, getGoogle, getGithub };
