<template>
  <div class="form">
    <div class="input-box">
      <input type="text" id="input" placeholder="请输入内容" />
      <label for="input">请输入内容</label>
      <div class="bottom-line"></div>
    </div>
    <div class="radio-box"></div>
    <div class="checkbox-box"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
$duration: 0.6s;

input {
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  background: none;
}
.form {
  background: #eee;
  padding: 20px;
}
.input-box {
  margin-top: 20px;
  position: relative;
  text-align: left;

  input {
    display: block;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    font-size: 16px;
    border-bottom: 1px solid gray;

    &::-webkit-input-placeholder {
      opacity: 0;
    }
  }

  input:focus + label, input:not(:placeholder-shown) + label {
    transform: translate(2px, -100%);
  }

  label {
    position: absolute;
    left: 0;
    top: 0;
    transition: all $duration;
    font-size: 16px;
    color: gray;
    cursor: text;
  }

  .bottom-line {
    height: 1px;
    width: 0;
    bottom: 1px;
    background: red;
    position: relative;
    transition: all $duration;
  }

  input:focus ~ .bottom-line, input:not(:placeholder-shown) ~ .bottom-line {
    width: 100%;
  }
}
</style>


