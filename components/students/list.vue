<template>
  <div>
    <div class="main_wrapper">
      <p class="sum_number">15件</p>
      <div class="main_content">
        <table>
          <tbody>
            <tr>
              <th>名前</th>
              <th>年齢</th>
              <th>生年月日</th>
              <th>e-mail</th>
              <th>TEL</th>
              <th>プラン名</th>
            </tr>
            <tr v-for="student in students" :key="student">
              <td>{{ student.name }}</td>
              <td>{{ student.age }}</td>
              <td>{{ student.birth }}</td>
              <td>{{ student.mail }}</td>
              <td>{{ student.tel }}</td>
              <td>{{ student.plan }}</td>
              <td>
                <div class="btn_group">
                  <NuxtLink to="/progress">
                    <div class="progress_btn btn btn_option">進捗報告</div>
                  </NuxtLink>
                  <NuxtLink to="/students/edit">
                    <div class="edit_btn btn btn_option">編集</div>
                  </NuxtLink>
                  <div class="delete_btn btn btn_option btn_option">削除</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pagers">
      <a href="#"><div class="pager active btn_option">1</div></a>
      <a href="#"><div class="pager btn_option">2</div></a>
      <a href="#" class="next"> <i class="fas fa-angle-right"></i> </a>
    </div>
  </div>
</template>

<script>


export default {
data(){
  return {
    students: [
        {
          name: "小林 空晏",
          age: 21,
          birth: '2000/02/19',
          mail:'aaa@ggmail.com',
          tel:'000-0000-0000',
          plan:'PREMIUM'
        },
        {
          name: "kuua kobayashi",
          age: 22,
          birth: '2000/01/16',
          mail:'kuua@ggmail.com',
          tel:'1230-0000-0000',
          plan:'STANDARD'
        },
      ],
  }
}
}
</script>
