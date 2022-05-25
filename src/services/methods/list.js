import i18n from "@/i18n";

export const search = (users, searchInfo, search) => {
  const fields = searchInfo.fields;
  return users.filter((user) => {
    let t = false;
    fields.forEach((field) => {
      const f = field.split(".");
      if (f.length == 2) {
        if (
          user[f[0]][f[1]] &&
          user[f[0]][f[1]]
            .toString()
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        ) {
          t = true;
          return;
        }
      } else {
        if (
          user[field] &&
          user[field]
            .toString()
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        ) {
          t = true;
          return;
        }
      }
    });
    return t;
  });
};

export const sort = (users, sort) => {
  const value = sort.split(":")[0];
  const direction = sort.split(":")[1];
  return users.sort((o1, o2) => {
    if (o1[value] > o2[value]) return direction == "asc" ? 1 : -1;
    if (o1[value] < o2[value]) return direction == "asc" ? -1 : 1;
    return 0;
  });
};

export const filter = (users, filters) => {
  filters.forEach((filter) => {
    if (filter.values.length > 0) {
      switch (filter.type) {
        case "checkbox":
          users = users.filter((user) =>
            filter.values.includes(user[filter.id])
          );
          break;
      }
    }
  });
  return users;
};

export const paginate = (users, p) => {
  return users.filter(
    (user) =>
      users.indexOf(user) >= (p.page - 1) * p.limit &&
      users.indexOf(user) < p.page * p.limit
  );
};

export const recordsCount = (p, l) => {
  if (l > 0) {
    const from = (p.page - 1) * p.limit + 1;
    const to = p.page * p.limit > l ? l : p.page * p.limit;
    return from + " - " + to + " " + i18n.global.t("of") + " " + l;
  } else {
    return i18n.global.t("noRecordsForFilters");
  }
};
