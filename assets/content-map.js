const contentMap = {
  site: 'https://index-web-leyusports.com.cn',
  keywords: ['乐鱼体育', '体育赛事', '赛事资讯', '比分直播'],
  sections: [
    { id: 'home', label: '首页', tags: ['乐鱼体育', '首页', '导航'] },
    { id: 'live', label: '直播', tags: ['乐鱼体育', '直播', '比分'] },
    { id: 'news', label: '新闻', tags: ['乐鱼体育', '新闻', '赛事'] },
    { id: 'highlights', label: '集锦', tags: ['乐鱼体育', '集锦', '精彩'] },
    { id: 'stats', label: '数据', tags: ['乐鱼体育', '统计', '分析'] }
  ]
};

function searchContent(query, data = contentMap) {
  const q = query.toLowerCase();
  const results = [];

  const matchTags = (item) => {
    if (!item.tags) return false;
    return item.tags.some(tag => tag.toLowerCase().includes(q));
  };

  const matchLabel = (item) => {
    if (!item.label) return false;
    return item.label.toLowerCase().includes(q);
  };

  const matchKeywords = () => {
    if (!data.keywords) return false;
    return data.keywords.some(kw => kw.toLowerCase().includes(q));
  };

  for (const section of data.sections) {
    if (matchTags(section) || matchLabel(section)) {
      results.push(section);
    }
  }

  if (results.length === 0 && matchKeywords()) {
    results.push({ id: 'keyword-match', label: '关键词匹配', tags: ['乐鱼体育', query] });
  }

  return results;
}

function listAllSections(data = contentMap) {
  return data.sections.map(s => ({
    id: s.id,
    label: s.label,
    tags: s.tags.join(', ')
  }));
}

function getSectionById(id, data = contentMap) {
  return data.sections.find(s => s.id === id) || null;
}

function addSection(newSection, data = contentMap) {
  const exists = data.sections.some(s => s.id === newSection.id);
  if (!exists) {
    data.sections.push(newSection);
    return true;
  }
  return false;
}

function removeSectionById(id, data = contentMap) {
  const index = data.sections.findIndex(s => s.id === id);
  if (index !== -1) {
    data.sections.splice(index, 1);
    return true;
  }
  return false;
}

function updateSection(id, updates, data = contentMap) {
  const section = data.sections.find(s => s.id === id);
  if (!section) return false;
  if (updates.label) section.label = updates.label;
  if (updates.tags) section.tags = updates.tags;
  return true;
}

function filterByTag(tag, data = contentMap) {
  const t = tag.toLowerCase();
  return data.sections.filter(s =>
    s.tags.some(st => st.toLowerCase().includes(t))
  );
}

function getSiteInfo(data = contentMap) {
  return {
    url: data.site,
    keywordCount: data.keywords.length,
    sectionCount: data.sections.length
  };
}

function generateTagCloud(data = contentMap) {
  const cloud = {};
  for (const section of data.sections) {
    for (const tag of section.tags) {
      cloud[tag] = (cloud[tag] || 0) + 1;
    }
  }
  return Object.entries(cloud).map(([tag, count]) => ({ tag, count }));
}

function sortSectionsByLabel(data = contentMap) {
  const sorted = [...data.sections];
  sorted.sort((a, b) => a.label.localeCompare(b.label));
  return sorted;
}

function findSectionsByKeyword(keyword, data = contentMap) {
  const kw = keyword.toLowerCase();
  return data.sections.filter(s =>
    s.tags.some(t => t.toLowerCase().includes(kw))
  );
}