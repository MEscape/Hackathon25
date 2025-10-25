import {reduxStorage} from "@/utils/storage";
import {PersistConfig} from "redux-persist";
import {RootState} from "@/store";
import {AuthState} from "@/store/slices/authSlice";

export const root: PersistConfig<RootState> = {
    key: 'root',
    storage: reduxStorage,
    whitelist: ['auth'],
    blacklist: ['api'],
    version: 1,
    timeout: 1000,
};

export const auth: PersistConfig<AuthState> = {
    key: 'auth',
    storage: reduxStorage,
    blacklist: ['isLoading', 'error'],
};