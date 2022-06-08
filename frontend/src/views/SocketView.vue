<template>
  <b-container>
    <b-row>
      <b-button @click="makeConnection" variant="success" class="mr-2">소켓 통신 시작</b-button>
      <b-button @click="closeConnection" variant="danger">소켓 통신 종료</b-button>
    </b-row>
    <b-row>
      <b-form @submit.prevent="sendMessage">
        <b-form-group id="message" label="메시지 전송" label-for="message">
          <b-form-input
            id="message"
            v-model="message"
            placeholder="전송할 메시지를 입력하세요."
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-row>
    <b-row> 서버에서 받은 메시지: {{ socketServerMsg }} </b-row>
  </b-container>
</template>

<script>
export default {
  name: "SocketView",
  data() {
    return {
      socket: null,
      message: "",
      socketServerMsg: "",
    };
  },
  methods: {
    makeConnection() {
      /* global io */
      this.socket = io("localhost:5500");
      console.log(this.socket);

      this.socket.on("chat", (msg) => {
        this.socketServerMsg = msg;
      });
    },
    closeConnection() {
      this.socket.disconnect();
    },
    sendMessage() {
      this.socket.emit("chat", this.message);
      this.message = "";
    },
  },
};
</script>

<style></style>
