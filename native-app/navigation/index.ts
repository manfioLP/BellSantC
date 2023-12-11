import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {CompositeNavigationProp} from "@react-navigation/core";

export type RootStackParamList = {
    login: undefined;
    modal: undefined;
    "(tabs)": undefined;
    "[...missing]": undefined;
};

// export type RootTabParamList = {
//     Drafts: undefined;
//     Settings: undefined;
// };

// export type NavigationProp<
//     S extends keyof RootStackParamList,
//     T extends keyof RootTabParamList,
// > = CompositeNavigationProp<
//     NativeStackNavigationProp<RootStackParamList, S>,
//     BottomTabNavigationProp<RootTabParamList, T>
// >;
export const RootStack = createNativeStackNavigator<RootStackParamList>();
