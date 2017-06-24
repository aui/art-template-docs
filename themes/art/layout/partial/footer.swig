<footer id="footer" class="wrapper">
  <div class="inner">
    <div id="footer-copyright">
      &copy; {{ moment(Date.now()).year() }} {{ config.author }}<br>
      Documentation licensed under <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>.
    </div>
    <div id="footer-links">
      {% if config.weibo %}<a href="http://weibo.com/{{ config.weibo }}" class="footer-link" target="_blank"><i class="fa fa-weibo"></i></a>{% endif %}
      {% if config.twitter %}<a href="https://twitter.com/{{ config.twitter }}" class="footer-link" target="_blank"><i class="fa fa-twitter"></i></a>{% endif %}
      {% if config.github %}<a href="https://github.com/{{ config.github }}" class="footer-link" target="_blank"><i class="fa fa-github-alt"></i></a>{% endif %}
    </div>
  </div>
</footer>
