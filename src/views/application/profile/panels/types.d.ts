interface IExpModal {
  type: "CREATE" | "EDIT" | "REMOVE";
  data: any;
  visibility: boolean;
}

interface IEduModal {
  type: "CREATE" | "EDIT" | "REMOVE";
  data: any;
  visibility: boolean;
}

interface IProjectModal extends IExpModal {
  type: "CREATE" | "EDIT" | "REMOVE" | "VIEW";
}
