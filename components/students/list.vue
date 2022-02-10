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
            <tr>
              <td>丸山 宏二</td>
              <td>20</td>
              <td>2001/9/21</td>
              <td>koji0921@ggmail.com</td>
              <td>080-1234-5678</td>
              <td>PREMIUM</td>
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
