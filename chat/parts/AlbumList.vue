<template>
  <section :class="myClass">
    <div class="album-item" v-for="(i, index) in items" :key="`item${index}`">
      <div class="album-item-left">
        <div class="album-item-img">
          <a class="btn-img" @click="selectItem(i)">
            <img src="https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg" alt="" />
          </a>
          <span class="btn-remove" href=""><ion-icon name="trash"></ion-icon></span>
        </div>
      </div>
      <div class="album-item-body">
        <h2>{{ i.dateDisp }}</h2>
        <p>{{ i.text }}</p>
        <p class="album-item-member">
          <UserIcon v-for="(u, index) in i.members" :url="u.iconurl" size="S" :key="`${index}-${u.iconurl}`" />
        </p>
      </div>
    </div>
    <a class="btn-more" href=""><ion-icon name="chevron-down-outline" size="large" /></a>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import UserIcon from './UserIcon.vue';
import { AlbumItem } from '../types/app';

type State = {};

export default Vue.extend({
  name: 'AlbumList',
  components: {
    UserIcon,
  },
  computed: {
    myClass(): any {
      const klass: any = { albumlist: true };

      if (this.editing) {
        klass['-editing'] = true;
      }
      return klass;
    },
  },
  props: {
    items: {
      default: () => [],
      type: Array as PropType<AlbumItem[]>,
    },
    editing: {
      default: false,
      type: Boolean,
    },
  },
  data(): State {
    return {};
  },
  mounted() {},
  methods: {
    selectItem() {
      if (this.editing) {
        console.log('さくじょします');
        return;
      }
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.albumlist {
  &.-editing {
    img {
      filter: sepia(100%);
    }
    .btn-remove {
      display: flex;
    }
    .btn-more {
      display: none;
    }
  }
}
.album-item {
  display: flex;
  margin: 0 0 30px;
}
.album-item-left {
  width: 120px;
  margin-right: 20px;
}
.album-item-img {
  position: relative;
}
.btn-img {
  position: relative;
  display: block;
  height: 80px;
  border-radius: 6px;
  flex-grow: 0;

  overflow: hidden;
  cursor: pointer;
}
img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.album-item-body {
  flex: 1 0 0;
  color: var(--chat-color-dark);
  h2 {
    margin-bottom: 0.3em;
    font-size: var(--fontsize-large);
    line-height: 1;
  }
  p {
    font-size: var(--fontsize-small);
  }
}
.album-item-member {
  display: flex;
  margin: 10px 0 0;
  .usericon {
    margin-right: 6px;
  }
}
.btn-more {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  text-align: center;
  margin: 30px auto;
}
.btn-remove {
  display: none;
  align-items: center;
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ion-icon {
    color: #aaa;
  }
  &::before {
    content: '';
    display: block;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
