export type Item = {
    text: string;
    id: string;
    checked: boolean;
  };
export  type ItemsResponseInterface = {
    items: Item[];
    error?:string;
  };
  export  type ItemAddResponseInterface = {
    id:string;
   
    error?:string;
  };
  export  type ItemDeleteResponseInterface = {
    ok:boolean;
    error?:string;
  };