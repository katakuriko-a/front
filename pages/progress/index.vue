<template>
  <div>
    <NuxtLink to="/progress/create">
      <div class="new_posts btn_option">
        <i class="fas fa-plus"></i><span>新規投稿</span>
      </div>
    </NuxtLink>
    <div class="main_wrapper">
      <div class="main_content signup_content">
        <h2>名前さんの進捗報告</h2>
        <table>
          <tbody>
            <tr>
              <th>タイトル</th>
              <th>本文</th>
            </tr>

            <tr>
              <td>タイトル</td>
              <td>本文</td>
              <td>
                <div class="btn_group">
                  <NuxtLink to="/progress/edit">
                    <div class="edit_btn btn btn_option">編集</div>
                  </NuxtLink>
                  <form class="destroy" method="post" action="" id="destroy">
                    <button class="delete_btn btn btn_option">削除</button>
                  </form>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- @if ($row === 0)
        <div class="alert alert-danger" role="alert">
          進捗報告がまだありません。
        </div>
        @endif -->
      </div>
    </div>
  </div>
</template>
