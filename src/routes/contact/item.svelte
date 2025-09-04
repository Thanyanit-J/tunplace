<script lang="ts">
  type itemProps = {
    id: string
    value: string
    iconSrc: string

    // Event Dispatcher
    copy?: (_id: typeof id) => void
  }

  let { id, value, iconSrc, copy }: itemProps = $props()

  function onClickCopy() {
    navigator.clipboard.writeText(value)
    copy?.(id)
  }
</script>

<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->

<div class="item-container">
  <img src={iconSrc} alt="" class="item-icon" height="25px" />
  <div class="item-value">{value}</div>
  <button class="item-copy-btn" onclick={onClickCopy}>Copy</button>
</div>

<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->
<!-- ############################################################################################################## -->

<style>
  .item-container {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 10px;
    align-content: center;
    justify-content: center;
    align-items: center;
    justify-items: start;
  }

  .item-icon {
    width: 25px;
  }

  .item-value {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-copy-btn {
    background-color: #6200ea;
    border: none;
    color: white;
    padding: 4px 8px;
    text-align: center;
    font-size: 12px;
    border-radius: 4px;
    transition:
      background-color 0.1s,
      box-shadow 0.1s;
    cursor: pointer;
  }

  .item-copy-btn:hover {
    background-color: #3700b3;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
