const fs=require('fs');

// fs.writeFileSync("./self_pratice/fs_module/myfile.txt","This is my file created using fs module");

// fs.appendFileSync("./self_pratice/fs_module/myfile.txt","\nThis is appended text");

// const data=fs.readFileSync("./self_pratice/fs_module/myfile.txt","utf-8");
// console.log(data);

// fs.renameSync("./self_pratice/fs_module/myfile.txt","./self_pratice/fs_module/mynewfile.txt");

// fs.unlinkSync("./self_pratice/fs_module/mynewfile.txt");

// fs.mkdirSync("./self_pratice/fs_module/myfolder");

// fs.rmdirSync("./self_pratice/fs_module/myfolder");



fs.readdir("./self_pratice/fs_module",(err,files)=>{
    if(err){
        console.log("Error",err);
    }
    else{
        console.log("Files and Folders:",files);
    }
});
