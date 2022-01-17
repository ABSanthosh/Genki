class GoogleUser {
  constructor(id, uid, avatar, email, isEmailVerified, name, providerId) {
    this.id = id;
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.providerId = providerId;
    this.isEmailVerified = isEmailVerified;
  }
}

class GithubUser {
  constructor({
    id,
    uid,
    avatar,
    email,
    isEmailVerified,
    name,
    preferredName,
    providerId,
  }) {
    this.id = id;
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.providerId = providerId;
    this.preferredName = preferredName;
    this.isEmailVerified = isEmailVerified;
  }
}

class User {
  constructor({
    uid,
    email,
    provider,
    otherProviders,
    GoogleUserData,
    GithubUserData,
    confirmationDetails,
  }) {
    this.uid = uid;
    this.email = email;
    this.provider = provider;
    this.otherProviders = otherProviders;
    this.GoogleUserData = GoogleUserData;
    this.GithubUserData = GithubUserData;
    this.confirmationDetails = confirmationDetails;
  }
}

function parseUserData(userData) {
  const isBothProviders = userData.identities.filter((provider) => {
    return provider.provider === "google" || provider.provider === "github";
  });

  let googleProvider = null;
  let githubProvider = null;

  if (isBothProviders.length === 2) {
    googleProvider = userData.identities.filter((provider) => {
      if (provider.provider === "google") {
        return new GoogleUser({
          id: provider.id,
          uid: provider.user_id,
          providerId: provider.identity_data.provider_id,
          email: provider.identity_data.email,
          name: provider.identity_data.full_name,
          avatar: provider.identity_data.avatar_url,
          isEmailVerified: provider.identity_data.email_verified,
        });
      } else {
        return null;
      }
    });

    githubProvider = userData.identities.filter((provider) => {
      if (provider.provider === "github") {
        return new GithubUser({
          id: provider.id,
          uid: provider.user_id,
          name: provider.identity_data.name,
          email: provider.identity_data.email,
          avatar: provider.identity_data.avatar_url,
          providerId: provider.identity_data.provider_id,
          isEmailVerified: provider.identity_data.email_verified,
          preferredName: provider.identity_data.preferred_username,
        });
      } else {
        return null;
      }
    });
  }

  let user = new User({
    uid: userData.id,
    email: userData.email,
    provider: userData.app_metadata.provider,
    otherProviders: userData.app_metadata.providers,
    GoogleUserData: googleProvider,
    GithubUserData: githubProvider,
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

export { GoogleUser, GithubUser, User, parseUserData };
