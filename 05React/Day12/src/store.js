import { create } from 'zustand'


export const useStore = create((set)=>({
    count:0,
    user: "Rohit",
    number: 10,
    userProfile: ["Apple","orange"],
    setUser: ()=>{
        set({user:"Mohit"});
    },
    setCount: ()=>{
        set((state)=>({
            count: state.count+1,
        }));
    },
    setNumber: (value)=>{
        set((state)=>({
            number: state.number+value,
        }))
    },
    setUserProfile: ((value)=>{
        set((state)=>({
            userProfile: [...state.userProfile,value]
        }))
    })
}));




