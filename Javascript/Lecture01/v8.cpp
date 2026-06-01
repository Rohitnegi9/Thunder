#include<iostream>
using namespace std;

int main(){
    string code;
    getline(cin,code);

    // Now print the element
    int open  = code.find('(');
    int close = code.rfind(')');
    string inside = code.substr(open+1,close-open-1);

    if(inside[0]=='"'){
        cout<<inside.substr(1,inside.size()-2)<<endl;
    }
    else{
        int index = 0, a = 0, b = 0;

        while((inside[index]!='+')&&(inside[index]!='-')&&(inside[index]!='*')&&(inside[index]!='/')){
            a = a*10 + (inside[index]-'0');
            index++;
        }

        char op = inside[index];
        index++;

        while(index<inside.size()){
            b = b*10 + (inside[index]-'0');
            index++;
        }

        if(op=='+'){
            cout<<a+b<<endl;
        }
        else if(op=='-'){
            cout<<a-b<<endl;
        }
        else if(op=='*'){
            cout<<a*b<<endl;
        }
        else{
            cout<<a/b<<endl;
        }
    }

    return 0;

}

    
// console.log("hello Ji");