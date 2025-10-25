import {reduxStorage} from "@/utils/storage";
import {PersistConfig} from "redux-persist";
import {RootState} from "@/store";
import {AuthState} from "@/store/slices/authSlice";
import {EmergencyContactsState} from "@/features/emergencyContacts/store/emergencyContactsSlice";

export const root: PersistConfig<RootState> = {
    key: 'root',
    storage: reduxStorage,
    whitelist: ['auth', 'emergencyContacts'],
    blacklist: ['api'],
    version: 1,
    timeout: 1000,
};

export const auth: PersistConfig<AuthState> = {
    key: 'auth',
    storage: reduxStorage,
    blacklist: ['isLoading', 'error'],
};

export const emergencyContacts: PersistConfig<EmergencyContactsState> = {
    key: 'emergencyContacts',
    storage: reduxStorage,
    blacklist: ['isLoading', 'error'],
}