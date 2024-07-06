import { defineStore } from 'pinia'
import { fetchProfile, updateProfile, type Profile } from '@/api/profile'
import { type Auth0VueClient } from '@auth0/auth0-vue';

export const useProfileStore = defineStore({
  id: 'profile',
  state: () => ({
    profile: <Profile | undefined>undefined,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async getOrFetch(auth0 : Auth0VueClient) : Promise<Profile | undefined> {
      if (this.profile == undefined) {
        await this.fetchProfile(auth0);
      }
      return Promise.resolve(this.profile);
    },
    async signOut() {
      this.profile = undefined;
    },
    async fetchProfile(auth0 : Auth0VueClient) {
      if (!auth0.isAuthenticated) {
        return;
      }
      
      this.loading = true;
      this.error = null;
      try {
        const response = await fetchProfile();
        this.profile = response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Profile not found, create a new profile
          const newProfile: Profile = {
            id: undefined,
            name: auth0.user.value?.name,
            email: auth0.user.value?.email,
            postalCode: undefined,
            currentSocCode: undefined,
            goalSocCode: undefined,
            termsOfUseConsent: false,
          };
          await this.updateProfile(newProfile);
        } else {
          this.error = 'Failed to fetch profile';
          console.error(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async updateProfile(profile: Profile) {
      this.loading = true;
      this.error = null;
      try {
        const response = await updateProfile(profile);
        this.profile = response.data;
      } catch (error) {
        this.error = 'Failed to update profile';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
