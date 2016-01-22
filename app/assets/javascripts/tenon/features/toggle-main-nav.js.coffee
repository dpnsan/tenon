class Tenon.features.ToggleMainNav
  constructor: ->
    @hasStorage = typeof(Storage) != "undefined"
    @_checkStorage() if @hasStorage

    $('.toggle-drawer').on('click', @_toggle)

  _toggle: (e) =>
    e.preventDefault()
    target = $(e.currentTarget).data('target')

    $('body').toggleClass("#{target}-open")
    console.log @hasStorage
    @_storeChange(target) if @hasStorage

  _storeChange: (target) ->
    if $('body').hasClass("#{target}-open")
      localStorage.setItem("#{target}-open", true)
    else
      localStorage.removeItem("#{target}-open")

  _checkStorage: ->
    navIsOpen = localStorage.getItem('main-nav-open')
    $('body').addClass('main-nav-open') if navIsOpen

    filterIsOpen = localStorage.getItem('filters-open')
    $('body').addClass('filters-open') if filterIsOpen