<template>
  <div class="login_contaner">
    <div class="login_box">
        <div class="avator_box">
            <img src="../assets/logo.png">
        </div>
        <el-form :model="loginFrom" :rules="rules" ref="loginFormRef" label-width="0px" class="login_form">
            <el-form-item prop="username">
                <el-input v-model="loginFrom.username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginFrom.password"  prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item class="login_btns">
                  <el-button type="primary" @click="Login">提交</el-button>
                  <el-button type="info" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                loginFrom: {
                    username: 'admin',
                    password: '123456'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                         { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                         { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            resetForm(){
                // this.loginFrom.username='zs',
                // this.loginFrom.password='123456'
                this.$refs['loginFormRef'].resetFields();
            },
            Login(){
                this.$refs.loginFormRef.validate(async valid=>{
                    if(!valid) return
                    // console.log('正在提交');
                    const resualts=await this.$http.post('login',this.loginFrom)
                    console.log(resualts);
                    if(resualts.data.status===0){
                         this.$message({
                            showClose: true,
                            message: resualts.data.message,
                            type: 'success'
                        });
                        // 跳转
                        this.$router.push('/home')
                    }else{
                        this.$message({
                            showClose: true,
                            message: resualts.data.message,
                            type: 'error'
                        });
                    }
                })
            }
        },
    }
</script>
<style lang="less" scoped>
/*element ui 组件*/
/*scoprd:阻止本组件样式扩散到本组件范围内生效*/
    .login_contaner{
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box{
        width: 450px;
        height: 300px;
        background-color: white;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .avator_box{
            width: 130px;
            height: 130px;
            background-color: white;
            border: 1px solid #eee;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            padding: 10px;
            box-shadow: 0 0 10px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
    }
    .login_btns{
        display: flex;
        justify-content: flex-end;
    }
</style>