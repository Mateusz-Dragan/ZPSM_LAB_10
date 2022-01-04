import React, { useEffect, useState } from 'react';
import  NetInfo  from "@react-native-community/netinfo";


export default function InternetCheck(){
    const [isInternetReachable, setIsInternetReachable] = useState(false)
    const InternetChecker = () => {
        useEffect(() => {
            // Subscribe
            const unsubscribe = NetInfo.addEventListener((state) => {
                setIsInternetReachable(state.isInternetReachable);
                console.log("Connection type", state.type);
                console.log("Is internet Reachable?", isInternetReachable);
            });
            return () => {
                unsubscribe();
            };
        },[isInternetReachable])
    }

    return [InternetChecker, isInternetReachable];

};
